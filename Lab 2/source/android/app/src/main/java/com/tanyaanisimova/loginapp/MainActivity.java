package com.tanyaanisimova.loginapp;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private TextView txtDetails;
    private EditText inputName, inputPhone;

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

        txtDetails = (TextView) findViewById(R.id.txt_user);
        inputName = (EditText) findViewById(R.id.name);
        inputPhone = (EditText) findViewById(R.id.phone);
        userImage = (ImageView) findViewById(R.id.ivUserImage);

        SQLiteDatabase database = new DBHelper(this).getReadableDatabase();

        String query = "SELECT * from " + DBSchema.User.TABLE_NAME
                + " WHERE " + DBSchema.User._ID + " = ?";

        userId = getIntent().getStringExtra("id");
        Cursor cursor = database.rawQuery(query , new String[] {userId});

        cursor.moveToFirst();

        inputName.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_NAME)));
//        binding.descEditText.setText(cursor.getString(cursor.getColumnIndex(SampleDBContract.Employer.COLUMN_DESCRIPTION)));

        Date date = new Date(Long.valueOf(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_BIRTHDAY))));
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String dateFormatted = formatter.format(date);

        inputPhone.setText(dateFormatted);
        cursor.close();

    }

    public void logout(View v) {
        finish();
    }
}