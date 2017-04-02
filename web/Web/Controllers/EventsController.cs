using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class EventsController : Controller
    {
        public ActionResult Index()
        {
			var events = EventManager.getEvents();
			if (events == null)
				events = new Event[] { };
			return View (events);
        }
    }
}
