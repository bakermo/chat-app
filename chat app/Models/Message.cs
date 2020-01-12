using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chat_app.Models
{
    public class Message
    {
        public string ClientUniqueId { get; set; }
        public string Type { get; set; }
        public string message { get; set; }
        public DateTime Date { get; set; }
    }
}
