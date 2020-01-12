using chat_app.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chat_app.Hubs
{
    public class MessageHub : Hub
    {
        public async Task NewMessage(Message msg) {
            await Clients.Others.SendAsync("MessageReceived", msg);
        }
    }
}
