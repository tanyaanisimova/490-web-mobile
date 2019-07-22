package com.tanyaanisimova.loginapp;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private TextView name, email, gender, birthday, university, major, minor, emphasis;

    ImageView userImage;

    private String userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        name = (TextView) findViewById(R.id.name);
        email = (TextView) findViewById(R.id.email);
        gender = (TextView) findViewById(R.id.gender);
        birthday = (TextView) findViewById(R.id.birthday);
        university = (TextView) findViewById(R.id.university);
        major = (TextView) findViewById(R.id.major);
        minor = (TextView) findViewById(R.id.minor);
        emphasis  = (TextView) findViewById(R.id.emphasis);
        userImage = (ImageView) findViewById(R.id.ivUserImage);

        SQLiteDatabase database = new DBHelper(this).getReadableDatabase();

        String query = "SELECT * from " + DBSchema.User.TABLE_NAME
                + " WHERE " + DBSchema.User._ID + " = ?";

        userId = getIntent().getStringExtra("id");
        Cursor cursor = database.rawQuery(query , new String[] {userId});

        cursor.moveToFirst();

        name.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_NAME)));
        email.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_EMAIL)));
//        gender.setText();
        emphasis.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_EMPHASIS)));
        university.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_UNIVERSITY)));
        major.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_MAJOR)));
        minor.setText(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_MINOR)));

        Date date = new Date(Long.valueOf(cursor.getString(cursor.getColumnIndex(DBSchema.User.COLUMN_BIRTHDAY))));
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String dateFormatted = formatter.format(date);

        birthday.setText(dateFormatted);
        cursor.close();
    }

    public void logout(View v) {
        finish();
    }
}