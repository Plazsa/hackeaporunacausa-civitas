using System;
namespace Web
{
	public class RegisterParams
	{
		public string fullName { get; set; }
		public string email { get; set; }
		public string occupation { get; set; }
		public string[] abilities { get; set; }
		public string summary { get; set; }
		public string location { get; set; }
		public string password { get; set; }
	}
}
