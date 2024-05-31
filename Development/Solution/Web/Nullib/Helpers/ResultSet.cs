using System;
using System.Collections.Generic;
using System.Text;

namespace Nullib.Helpers
{
    public class ResultSet : IDisposable
    {
        public ResultSet()
        {
            Status = ReturnType.Success;
        }

        private bool _disposed = false;

        public object Result { get; set; }

        public ReturnType Status { get; set; }

        public string Message { get; set; }
        
        public void Dispose(bool disposing)
        {
            if (_disposed) return;

            if (disposing)
            {

            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~ResultSet()
        {
            Dispose(false);
        }


        public enum ReturnType
        {
            Success = 1,
            Error = 3
        }
    }
}
