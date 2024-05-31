using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace Nullib.Dapper
{
    public class SQLServer : IDisposable
    {
        public string conString { get; set; }
        
        public SQLServer(String conString)
        {
            this.conString = conString;
        }
               

        public DynamicParameters SetDp(Dictionary<string, object> p)
        {
            DynamicParameters dp = new DynamicParameters();

            if (p != null)
            {
                foreach (var r in p)
                {
                    dp.Add("@" + r.Key, r.Value, DbType.String, ParameterDirection.Input);
                }
            }
           

            return dp;
        }
        

        public int InsertMultiple<T>(List<T> toInsert)
        {
            using (var connection = new SqlConnection(conString))
            {
                return (int)connection.Insert(toInsert);
            }
        }


        public List<IDictionary<string, object>> ExecQuery(string q, Dictionary<string, object> p = null)
        {
            using (var con = new SqlConnection(conString))
            {
                return con.Query(q, SetDp(p)).Select(x => (IDictionary<string, object>)x).ToList();
            }
        }

        public T QuerySingle<T>(string sql, Dictionary<string, object> p = null)
        {
            using (var con = new SqlConnection(conString))
            {
                return con.QueryFirstOrDefault<T>(sql, p);
            }
        }

        public List<T> Query<T>(string sql, Dictionary<string, object> p = null)
        {
            using (var con = new SqlConnection(conString))
            {

                return con.Query<T>(sql, SetDp(p)).ToList();
            }
        }

        public int Execute(string sql, Dictionary<string, object> p = null)
        {
            using (var connection = new SqlConnection(conString))
            {
                return connection.Execute(sql, SetDp(p));
            }
        }

        public DataSet ExecQueryDS(String Command)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            SqlCommand command = new SqlCommand();

            try
            {
                using (var conn = new SqlConnection(conString))
                {
                    conn.Open();

                    command.Connection = conn;
                    command.CommandText = Command;
                    command.CommandTimeout = 3000;
                    command.CommandType = CommandType.Text;

                    da.SelectCommand = command;
                    da.Fill(ds);
                }
                return ds;
            }
            catch
            {
                throw;
            }
            finally
            {
                da?.Dispose();
                ds?.Dispose();
                command?.Dispose();
            }
        }
             
        public List<dynamic> ExecTables(string q)
        {
            using (var con = new SqlConnection(conString))
            {
                List<dynamic> list = new List<dynamic>();
                var tables = con.QueryMultiple(q);
                while (!tables.IsConsumed)
                {
                    list.Add(tables.Read());
                }

                return list;
            }
        }

        public void Dispose()
        {
            GC.Collect();
            GC.SuppressFinalize(this);
        }
    }
}
