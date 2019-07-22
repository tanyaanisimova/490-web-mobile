package com.tanyaanisimova.loginapp;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

     // UI references.
    private AutoCompleteTextView mEmailView;
    private EditText mPasswordView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mEmailView = (AutoCompleteTextView) findViewById(R.id.email);
        mPasswordView = (EditText) findViewById(R.id.password);
    }

    public void login(View v) {
        //reset errors
        mEmailView.setError(null);
        mPasswordView.setError(null);

        String password = mPasswordView.getText().toString();
        if (TextUtils.isEmpty(password)) {
            mPasswordView.setError(getString(R.string.error_field_required));
        } else if (!isPasswordValid(password)) {
            mPasswordView.setError(getString(R.string.error_invalid_password));
        }

        String email = mEmailView.getText().toString();
        if (TextUtils.isEmpty(email)) {
            mEmailView.setError(getString(R.string.error_field_required));
        } else if (!isEmailValid(email)) {
            mEmailView.setError(getString(R.string.error_invalid_email));
        }

        SQLiteDatabase database = new DBHelper(this).getReadableDatabase();

        String selection =
                DBSchema.User.COLUMN_EMAIL + " = ? and " +
                        DBSchema.User.COLUMN_PASSWORD + " = ? ";

        String[] selectionArgs = {email, password};

        Cursor cursor = database.query(
                DBSchema.User.TABLE_NAME, null, selection, selectionArgs,
                null, null, null
        );

        if (cursor.moveToFirst()) {
            String id = cursor.getString(cursor.getColumnIndex(DBSchema.User._ID));
            Intent intent = new Intent(this, MainActivity.class);
            intent.putExtra("id", id);
            startActivity(intent);

        } else {
            Toast.makeText(this, "Incorrect Login Credentials", Toast.LENGTH_SHORT).show();
        }
    }

    private boolean isEmailValid(String email) {
        return email.contains("@");
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 6;
    }

    public void register(View v) {
        Intent redirect = new Intent(LoginActivity.this, RegisterActivity.class);
        startActivity(redirect);
    }
}

