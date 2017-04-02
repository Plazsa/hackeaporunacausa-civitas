using System;
namespace Web
{
	public class Volunteer
	{
		public string id { get; set; }
		public string[] abilities { get; set; }
		public Badges[] badges { get; set; }
		public string summary { get; set; }
		public string fullName { get; set; }
		public string occupation { get; set; }
		public string location { get; set; }
		public string picture { get; set; }
		public string email { get; set; }
		public int points { get; set; }

	}
}
