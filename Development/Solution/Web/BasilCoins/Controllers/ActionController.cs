using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using BasilCoins.Helper;
using BasilCoins.Models;
using Dapper;
using Dapper.Contrib.Extensions;
using LZStringCSharp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Nullib.Helpers;
using z.Data;
using static Nullib.Helpers.ResultSet;

namespace BasilCoins.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ActionController : BaseController
    {

        public Dictionary<string, object> dp { get; set; }

        public ActionController(IHostingEnvironment e)
        {
            dir = e.WebRootPath;
            dp = new Dictionary<string, object>();
        }

        [HttpGet]
        public ResultSet Test()
        {
            using (var r = new ResultSet())
            {
                try
                {
                    
                    r.Result = sql.ExecQuery($"SELECT * FROM dbo.tComputerUser");

                    return r;
                }
                catch (Exception e)
                {
                    var inner = e.InnerException != null ? ", InnerException:" + e.InnerException.Message : "";
                    r.Message = $"{e.Message}{inner},Metnod: {e.TargetSite.Name},  Param: {JsonConvert.SerializeObject(Q)}";
                    r.Status = ReturnType.Error;

                    return r;
                }

            }
        }

        [HttpPost]
        public ResultSet Login()
        {

            using (var r = new ResultSet())
            {

                try
                {
                    List<tUser> user = new List<tUser>()
                    {
                        new tUser()
                        {
                            ID = 1,
                            Name = "Leomax",
                            Email = "leomax",
                            Password = "123"
                        }
                    };


                    if (user.Where(x => x.Email == Q["email"].ToString() && x.Password == Q["password"].ToString()).Any())
                    {


                        var session = new BrowserSession()
                        {
                            ID = Context.Session.Id,
                            Name = user[0].Name,
                            ID_User = user[0].ID,
                            ID_Customer = 0
                        };

                        Context.Session.SetString("session", JsonConvert.SerializeObject(session));

                        r.Result = session;

                    }
                    else
                    {
                        r.Message = "Invalid Email or Password";
                        r.Status = ReturnType.Error;
                    }




                    return r;
                }
                catch (Exception ex)
                {

                    throw ex;
                }

            }

        }

        [HttpPost]
        public ResultSet Register()
        {

            using (var r = new ResultSet())
            {

                try
                {
                    using (var con = new SqlConnection(AppSettings.ConnectionString))
                    {
                        con.Open();
                        using (var tran = con.BeginTransaction())
                        {
                            try
                            {
                                var NewCustomer = JsonConvert.DeserializeObject<tCustomer>(Q["newCustomer"].ToString());

                                StringValues origin;
                                
                                Request.Headers.TryGetValue("Origin", out origin);
                                
                                NewCustomer.Name = (NewCustomer.FirstName + ", " + NewCustomer.LastName);

                                NewCustomer.Password = sql.ExecQuery($"SELECT dbo.fEncrypt('{NewCustomer.Password}', 41) as password")[0]["password"].ToString();

                                con.Insert(NewCustomer, tran);
                                
                                var body = System.IO.File.ReadAllText(Path.Combine(dir, "Templates\\EmailVerification.tmpl.html"));

                                body = ReplaceCode(body, "AccountVerification", origin + "/api/Action/verify?id=" + LZString.CompressToBase64(Uri.EscapeUriString(CryptoJS.Encrypt(NewCustomer.ID.ToString(), AppSettings.Encryption.Key, AppSettings.Encryption.Salt))));

                                //SendMail("Basils Coins","Account Verification",body,NewCustomer.Email);                             
                                
                                tran.Commit();

                                con.Close();
                            }
                            catch (Exception ee)
                            {
                                tran.Rollback();
                                con.Close();
                                throw ee;
                            }

                        }
                    }

                    return r;
                }
                catch (Exception ex)
                {

                    throw ex;
                }

            }

        }


        [HttpGet]
        public RedirectResult verify()
        {
            try
            {
                sql.Execute("UPDATE dbo.tCustomer SET IsActive = 1, DateVerified = @DateVerified WHERE ID = @ID_Customer",
                      new Pair() { { "DateVerified", DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") }, { "ID_Customer", Convert.ToInt32(Q["id"]) } });


                return Redirect(Request.Scheme + "://" + Request.Host.ToString() + "/#!/Login");

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }




        //[HttpPost]
        //public ResultSet Verification()
        //{

        //    using (var r = new ResultSet())
        //    {

        //        try
        //        {
        //            var code = Q["VerificationCode"].ToString();


        //            if (sql.Query<tCustomer>($"Select ID From tCustomer where VerificationCode = @vercode and IsActive = 0",new Pair() { { "vercode",code} }).Any())
        //            {

        //                sql.Execute("UPDATE dbo.tCustomer SET IsActive = 1,[Password] = dbo.fEncrypt(@password, 41) WHERE VerificationCode = @vercode",
        //                    new Pair() { { "password", Q["Password"].ToString() },{ "vercode", code }});

        //            }
        //            else
        //            {

        //            }

        //            return r;
        //        }
        //        catch (Exception ex)
        //        {

        //            throw ex;
        //        }

        //    }

        //}

    }
}