package com.tanyaanisimova.loginapp;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ContentValues;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class RegisterActivity extends AppCompatActivity {

    int REQUEST_CAMERA=0;
    int SELECT_FILE=1;
    ImageView userImage ;
    EditText txtAddress;
    String userChosenTask;
    Bitmap userPhoto=null;

    private EditText emailInput;
    private EditText passwordInput;
    private EditText nameInput;
    private EditText birthdayInput;
    private EditText universityInput;
    private EditText majorInput;
    private EditText emphasisInput;
    private EditText minorInput;

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        userImage = (ImageView) findViewById(R.id.ivUserImage);
        emailInput = (EditText) findViewById(R.id.email);
        passwordInput = (EditText) findViewById(R.id.password);
        birthdayInput = (EditText) findViewById(R.id.birthday);

//        birthdayInput = (EditText) findViewById(R.id.birthday);
        universityInput = (EditText) findViewById(R.id.university);
        majorInput = (EditText) findViewById(R.id.major);
        emphasisInput = (EditText) findViewById(R.id.emphasis);
        minorInput = (EditText) findViewById(R.id.minor);
        nameInput = (EditText) findViewById(R.id.name);
    }

    public void onClickOfPhotoButton(View v) {
        //This code redirects to the photo activity.
        selectImage();
    }

    private void selectImage() {
        final CharSequence[] items = { "Take Photo", "Choose from Library", "Cancel" };
        AlertDialog.Builder builder = new AlertDialog.Builder(RegisterActivity.this);
        builder.setTitle("Add Photo!");
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                //boolean result=Utility.checkPermission(SignUpActivity.this);
                boolean result=true;
                if (items[item].equals("Take Photo")) {
                    userChosenTask ="Take Photo";
                    if(result)
                        cameraIntent();
                } else if (items[item].equals("Choose from Library")) {
                    userChosenTask ="Choose from Library";
                    if(result)
                        galleryIntent();
                } else if (items[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    private void cameraIntent()
    {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent, REQUEST_CAMERA);
    }

    private void galleryIntent()
    {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);//
        startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == SELECT_FILE) {
                onSelectFromGalleryResult(data);

            } else if (requestCode == REQUEST_CAMERA) {
                onCaptureImageResult(data);

            }
        }
    }


    private void onSelectFromGalleryResult(Intent data) {

        Bitmap bm=null;
        if (data != null) {
            try {
                bm = MediaStore.Images.Media.getBitmap(getApplicationContext().getContentResolver(), data.getData());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        this.userPhoto=bm;
        userImage.setImageBitmap(bm);
    }

    private void onCaptureImageResult(Intent data) {
        Bitmap thumbnail = (Bitmap) data.getExtras().get("data");
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        thumbnail.compress(Bitmap.CompressFormat.JPEG, 90, bytes);

        File destination = new File(Environment.getExternalStorageDirectory(),
                System.currentTimeMillis() + ".jpg");

        FileOutputStream fo;
        try {
            destination.createNewFile();
            fo = new FileOutputStream(destination);
            fo.write(bytes.toByteArray());
            fo.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        this.userPhoto=thumbnail;
        userImage.setImageBitmap(thumbnail);
    }


    public void register(View v) {
        String email = emailInput.getText().toString().trim();
        String password = passwordInput.getText().toString().trim();

        //reset errors
        emailInput.setError(null);
        passwordInput.setError(null);

        if (TextUtils.isEmpty(email)) {
            emailInput.setError(getString(R.string.error_field_required));
            return;
        } else if (!email.contains("@")) {
            emailInput.setError(getString(R.string.error_invalid_email));
            return;
        }

        if (TextUtils.isEmpty(password)) {
            passwordInput.setError(getString(R.string.error_field_required));
            return;
        } else if (password.length() < 6) {
            passwordInput.setError(getString(R.string.error_invalid_password));
            return;
        }

        SQLiteDatabase database = new DBHelper(this).getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DBSchema.User.COLUMN_EMAIL, email);
        values.put(DBSchema.User.COLUMN_PASSWORD, password);
        values.put(DBSchema.User.COLUMN_NAME, nameInput.getText().toString().trim());
        values.put(DBSchema.User.COLUMN_MAJOR, nameInput.getText().toString().trim());
        values.put(DBSchema.User.COLUMN_UNIVERSITY, nameInput.getText().toString().trim());
        values.put(DBSchema.User.COLUMN_EMPHASIS, nameInput.getText().toString().trim());
        values.put(DBSchema.User.COLUMN_MINOR, nameInput.getText().toString().trim());
      try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime((new SimpleDateFormat("dd/MM/yyyy")).parse(
                   birthdayInput.getText().toString()));
            long date = calendar.getTimeInMillis();
            values.put(DBSchema.User.COLUMN_BIRTHDAY, date);
        }
        catch (Exception e) {
            Toast.makeText(this, "Date is in the wrong format", Toast.LENGTH_LONG).show();
            return;
        }

        long id = database.insert(DBSchema.User.TABLE_NAME, null, values);

        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("id", id);
        startActivity(intent);
        finish();
    }
}
