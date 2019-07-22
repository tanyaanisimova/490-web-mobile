package com.tanyaanisimova.loginapp;

import android.provider.BaseColumns;

public final class DBSchema {

//    public static final String SELECT_EMPLOYEE_WITH_EMPLOYER = "SELECT * " +
//            "FROM " + Employee.USER_TABLE + " ee INNER JOIN " + Employer.USER_TABLE + " er " +
//            "ON ee." + Employee.COLUMN_EMPLOYER_ID + " = er." + Employer._ID + " WHERE " +
//            "ee." + Employee.COLUMN_FIRSTNAME + " like ? AND ee." + Employee.COLUMN_LASTNAME + " like ?";
//
//    public static final String SELECT_EMPLOYEE_ALL = "SELECT * " +
//            "FROM " + Employee.USER_TABLE + " ee INNER JOIN " + Employer.USER_TABLE + " er " +
//            "ON ee." + Employee.COLUMN_EMPLOYER_ID + " = er." + Employer._ID;
//
//    public static final String SELECT_EMPLOYEE_BY_ID = "SELECT * " +
//            "FROM " + Employee.USER_TABLE + " ee INNER JOIN " + Employer.USER_TABLE + " er " +
//            "ON ee." + Employee.COLUMN_EMPLOYER_ID + " = er." + Employer._ID + " WHERE " +
//            "ee." + Employee.EMPLOYEE_ID + " = ?";
//

    //"SELECT * FROM EMPEE ee INNER JOIN Employer er ON ee.EMPLOYER_ID  = er.Employer._ID
    // WHERE ee.COLUMN_FIRSTNAME  like ? AND ee.COLUMN_LASTNAME like ?"

    private DBSchema() {
    }

    public static class User implements BaseColumns {
        public static final String USER_TABLE = "user";
        public static final String COLUMN_NAME = "name";
        public static final String COLUMN_UNIVERSITY = "university";
        public static final String COLUMN_MAJOR = "major";
        public static final String COLUMN_EMPHASIS = "emphasis";
        public static final String COLUMN_GENDER = "gender";
        public static final String COLUMN_MINOR = "minor";
        //public static final String COLUMN_PICTURE = "picture";
        public static final String COLUMN_BIRTHDAY = "birthday";

        public static final String CREATE_TABLE = "CREATE TABLE IF NOT EXISTS " +
                USER_TABLE + " (" +
                _ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                COLUMN_NAME + " TEXT, " +
                COLUMN_UNIVERSITY + " TEXT, " +
                COLUMN_MAJOR + " TEXT, " +
                COLUMN_EMPHASIS + " TEXT, " +
                COLUMN_GENDER + " TEXT, " +
                COLUMN_MINOR + " TEXT, " +
                //COLUMN_PICTURE + " BLOB, " +
                COLUMN_BIRTHDAY + " INTEGER" + ")";
    }
}
