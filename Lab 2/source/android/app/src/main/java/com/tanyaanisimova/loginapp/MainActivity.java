package com.tanyaanisimova.loginapp;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private TextView txtDetails;
    private EditText inputName, inputPhone;
    private Button btnSave;
    private Button btnDelete;
    private Button btnLogout;
    private Button btnUpload;

    int REQUEST_CAMERA = 0;
    int SELECT_FILE = 1;
    ImageView userImage;
    String userChosenTask;
    Bitmap userPhoto = null;

    private String userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Displaying toolbar icon
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setIcon(R.mipmap.ic_launcher);

        txtDetails = (TextView) findViewById(R.id.txt_user);
        inputName = (EditText) findViewById(R.id.name);
        inputPhone = (EditText) findViewById(R.id.phone);
        btnSave = (Button) findViewById(R.id.btn_save);
        btnDelete = (Button) findViewById(R.id.btn_delete);
        btnLogout = (Button) findViewById(R.id.btn_logout);
        btnUpload = (Button) findViewById(R.id.btn_upload);
        userImage = (ImageView) findViewById(R.id.ivUserImage);

    }

    public void onClickOfPhotoButton(View v) {
        //This code redirects to the photo activity.
        //selectImage();
    }
}