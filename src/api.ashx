<%@ WebHandler Language="C#" Class="api" %>

using System;
using System.Web;
using System.Linq;
using System.IO;

public class api : IHttpHandler {
    string apiid;
    public void ProcessRequest (HttpContext context) {
        string imageNmae = null;
        var httpRequest = HttpContext.Current.Request;

        var postedFile = httpRequest.Files["Image"];
        apiid = httpRequest.Params["apiid"];
        imageNmae = httpRequest.Params["name"];
        if (postedFile != null)
        {
            if (apiid == "recept")
            {
                var filepath = HttpContext.Current.Server.MapPath("~/assets/img/recept/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
            else if (apiid == "blog")
            {
                var filepath = HttpContext.Current.Server.MapPath("~/assets/img/blog/" + imageNmae);
                postedFile.SaveAs(filepath);

                Stream strm = postedFile.InputStream;  
                var filePath1 = HttpContext.Current.Server.MapPath("~/assets/img/blog/" + imageNmae);
                Compressimage(strm, filePath1, postedFile.FileName);

            }
            else if (apiid == "qr")
            {
                var filepath = HttpContext.Current.Server.MapPath("~/assets/img/qr/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
            else if (apiid == "registration")
            {
                var filepath = HttpContext.Current.Server.MapPath("~/assets/img/registration/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
        }
        else
        {
            HttpFileCollection hfc = HttpContext.Current.Request.Files;
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                if (hpf.ContentLength > 0)
                {
                    string FileName = (Path.GetFileName(hpf.FileName));
                    if (!File.Exists("~/assets/img/product/" + FileName))
                    {
                        hpf.SaveAs("~/assets/img/product/" + FileName);
                    }
                }
            }
        }
    }
    public bool IsReusable {
        get {
            return false;
        }
    }


    public static void Compressimage(Stream sourcePath, string targetPath, String filename){  
        try  
        {  
            using (var image = Image.FromStream(sourcePath))  
            {  
                float maxHeight = 200.0f;  
                float maxWidth = 200.0f;
                int newWidth;  
                int newHeight;  
                string extension;  
                Bitmap originalBMP = new Bitmap(sourcePath);  
                int originalWidth = originalBMP.Width;  
                int originalHeight = originalBMP.Height;  

                if (originalWidth > maxWidth || originalHeight > maxHeight)  
                {  

                    // To preserve the aspect ratio  
                    float ratioX = (float)maxWidth / (float)originalWidth;  
                    float ratioY = (float)maxHeight / (float)originalHeight;  
                    float ratio = Math.Min(ratioX, ratioY);  
                    newWidth = (int)(originalWidth * ratio);  
                    newHeight = (int)(originalHeight * ratio);  
                }  
                else  
                {  
                    newWidth = (int)originalWidth;  
                    newHeight = (int)originalHeight;  

                }  
                Bitmap bitMAP1 = new Bitmap(originalBMP, newWidth, newHeight);  
                Graphics imgGraph = Graphics.FromImage(bitMAP1);  
                extension = Path.GetExtension(targetPath);  
                if (extension == ".png" || extension == ".gif")  
                {  
                    imgGraph.SmoothingMode = SmoothingMode.AntiAlias;  
                    imgGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;  
                    imgGraph.DrawImage(originalBMP, 0, 0, newWidth, newHeight);  


                    bitMAP1.Save(targetPath, image.RawFormat);  

                    bitMAP1.Dispose();  
                    imgGraph.Dispose();  
                    originalBMP.Dispose();  
                }  
                else if (extension == ".jpg")  
                {  

                    imgGraph.SmoothingMode = SmoothingMode.AntiAlias;  
                    imgGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;  
                    imgGraph.DrawImage(originalBMP, 0, 0, newWidth, newHeight);  
                    ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);  
                    Encoder myEncoder = Encoder.Quality;  
                    EncoderParameters myEncoderParameters = new EncoderParameters(1);  
                    EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 50L);  
                    myEncoderParameters.Param[0] = myEncoderParameter;  
                    bitMAP1.Save(targetPath, jpgEncoder, myEncoderParameters);  

                    bitMAP1.Dispose();  
                    imgGraph.Dispose();  
                    originalBMP.Dispose();  

                }
            }  

        }  
        catch (Exception)  
        {  
            throw;  

        }  
    }

    public static ImageCodecInfo GetEncoder(ImageFormat format){

        ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();  

        foreach (ImageCodecInfo codec in codecs)  
        {  
            if (codec.FormatID == format.Guid)  
            {  
                return codec;  
            }  
        }  
        return null;  
    }


}