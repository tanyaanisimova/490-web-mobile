package rashmi.umkc.edu.samplecalendarapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.DatePicker;
import android.widget.TextView;

import com.example.displaycalendareventintent.R;

import java.util.Calendar;

public class CalendarActivity extends AppCompatActivity {
    DatePicker picker;
    TextView dateView;
    String dateText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);
        dateView = (TextView)findViewById(R.id.date);

        Calendar calendar = Calendar.getInstance();
        dateText = (calendar.get(Calendar.MONTH)+1) + "/" + calendar.get(Calendar.DAY_OF_MONTH) + "/" + calendar.get(Calendar.YEAR);
        dateView.setText(dateText);
//
        picker = (DatePicker) findViewById(R.id.picker);
        picker.init(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), new DatePicker.OnDateChangedListener() {
            @Override
            public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                dateText = (monthOfYear+1) + "/" + dayOfMonth + "/" + year;
                dateView.setText(dateText);
            }
        });

    }
}
