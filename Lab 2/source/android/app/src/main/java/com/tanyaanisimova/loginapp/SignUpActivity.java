package com.tanyaanisimova.loginapp;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class SignUpActivity extends AppCompatActivity {

    int REQUEST_CAMERA=0;
    int SELECT_FILE=1;
    ImageView userImage ;
    EditText txtAddress;
    String userChosenTask;
    Bitmap userPhoto=null;

    private EditText inputEmail, inputPassword;

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        //getActionBar().setTitle("Sign Up");
        userImage = (ImageView) findViewById(R.id.ivUserImage);
        inputEmail = (EditText) findViewById(R.id.etEmail);
        inputPassword = (EditText) findViewById(R.id.etPass);
    }

    public void onSignUp(View v) {
        //add the sign up details to firebase
        String email = inputEmail.getText().toString().trim();
        String password = inputPassword.getText().toString().trim();

        if (TextUtils.isEmpty(email)) {
            Toast.makeText(getApplicationContext(), "Enter email address!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(password)) {
            Toast.makeText(getApplicationContext(), "Enter password!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (password.length() < 6) {
            Toast.makeText(getApplicationContext(), "Password too short, enter minimum 6 characters!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (true) {
            Toast.makeText(getApplicationContext(), "inside firebase sign up ", Toast.LENGTH_SHORT).show();

        }

        startActivity(new Intent(SignUpActivity.this, LoginActivity.class));
        finish();
    }
}
