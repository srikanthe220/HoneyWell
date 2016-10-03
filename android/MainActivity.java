package com.example.drk.honeywell1;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

import com.example.drk.honeywell1.R;


public class MainActivity extends ActionBarActivity {
    EditText usernameEt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        usernameEt=(EditText)findViewById(R.id.etusername);
    }

    public void onsearch(View view)
    {
        String username1=usernameEt.getText().toString();
        String type ="search";
        backgroundworker backgroundworker1=new backgroundworker(this);
        backgroundworker1.execute(type,username1);
    }


}
