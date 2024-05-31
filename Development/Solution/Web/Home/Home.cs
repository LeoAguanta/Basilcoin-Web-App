using Microsoft.AspNetCore.Http;
using Nullib.Helpers;
using System;
using System.Collections.Generic;

namespace Null.Home
{
    public class Home
    {

        public static ResultSet Test2(Dictionary<string,object> Q, HttpContext Ctx)
        {

            var r = new ResultSet();

            r.Result = "test";

            return r;
        }

    }
}
