using System.Web;
using System.Web.Mvc;

namespace ESRGC.Qatar.WebApp_Routes
{
  public class FilterConfig
  {
    public static void RegisterGlobalFilters(GlobalFilterCollection filters) {
      filters.Add(new HandleErrorAttribute());
    }
  }
}