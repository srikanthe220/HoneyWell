package com.example.drk.honeywell1;

import android.app.AlertDialog;
import android.content.Context;
import android.os.AsyncTask;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

/**
 * Created by DRK on 25-Sep-16.
 */
public class backgroundworker extends AsyncTask<String,Void,String >{
    Context context;
    AlertDialog alertDialog;
    backgroundworker(Context ctx)
    {
        context=ctx;
    }

    String user_name="";
    String result="";
    @Override
    protected String  doInBackground(String... params) {
        String type=params[0];
        String post_data="";
        user_name=params[1];
        try {
            post_data= URLEncoder.encode("user_name","UTF-8")+"="+URLEncoder.encode(user_name,"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String search_url="http://10.0.2.2/query.php/"+post_data; //use the server's url for running ex:    "url"+post_data;
        if(type.equals("search"))
        {
            try {
                // user_name=params[1];
                URL url = new URL(search_url);
                HttpURLConnection httpURLConnection =(HttpURLConnection)url.openConnection();
                httpURLConnection.setRequestMethod("POST");
                httpURLConnection.setDoOutput(true);
                httpURLConnection.setDoInput(true);
                OutputStream outputStream=httpURLConnection.getOutputStream();
                BufferedWriter bufferedWriter= new BufferedWriter(new OutputStreamWriter(outputStream,"UTF-8"));
                //String post_data= URLEncoder.encode("user_name","UTF-8")+"="+URLEncoder.encode(user_name,"UTF-8");
                bufferedWriter.write(post_data);
                //Log.e("hi",post_data);
                bufferedWriter.flush();
                bufferedWriter.close();
                outputStream.close();
                InputStream inputStream= httpURLConnection.getInputStream();
                BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(inputStream,"iso-8859-1"));

                String line="";
                while ((line=bufferedReader.readLine())!=null)
                {
                    result += line;
                }
                bufferedReader.close();
                inputStream.close();
                httpURLConnection.disconnect();
                return result;

            }catch(MalformedURLException e)
            {
                e.printStackTrace();
            }catch(IOException e)
            {
                e.printStackTrace();
            }

        }
        return null;
    }

    @Override
    protected void onPreExecute() {
        alertDialog =new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Address");

    }

    @Override
    protected void onPostExecute(String result) {
        String alert1 = user_name + " is located near ";
        if(user_name.equals(""))
        {
            alertDialog.setMessage("No results");
        }
        else if(result.equals(""))
        {
            alertDialog.setMessage("Employee not found");
        }
        else{
            alertDialog.setMessage(alert1 + result);

        }
        alertDialog.show();

    }

    @Override
    protected void onProgressUpdate(Void... values) {
        super.onProgressUpdate(values);
    }
}
