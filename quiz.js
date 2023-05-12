function DoToggle(pId)
{
 var oCtl = document.getElementById(pId + "key");
 var oCtlbtn = document.getElementById(pId + "btn");
 
 if (oCtl.className == "cssQuizKey")
 {
  oCtl.className = "cssQuizKeyHide";
  oCtlbtn.value = "Show Answer";
 }
 else
 {
  oCtl.className = "cssQuizKey";
  oCtlbtn.value = "Hide Answer";
 }
}