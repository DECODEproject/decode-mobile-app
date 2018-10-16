package net.decode.zenroom;

import android.content.Context;
import android.util.Log;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

import host.exp.exponent.R;

public class ZenroomExecutor {

    private final Context context;

    public ZenroomExecutor(Context context) {
        this.context = context;
        copyZenroom();

    }

    public String execute(String contract, String data, String key) throws Exception {

        FileOutputStream outputStream = context.openFileOutput("contract.lua", Context.MODE_PRIVATE);
        outputStream.write(contract.getBytes());
        outputStream.close();

        outputStream = context.openFileOutput("data.txt", Context.MODE_PRIVATE);

        outputStream.write(data.getBytes());
        outputStream.close();

        outputStream = context.openFileOutput("key.txt", Context.MODE_PRIVATE);
        outputStream.write(key.getBytes());
        outputStream.close();

        String zenroomPath = context.getFileStreamPath("zenroom").getAbsolutePath();
        String contractPath = context.getFileStreamPath("contract.lua").getAbsolutePath();
        String dataPath = context.getFileStreamPath("data.txt").getAbsolutePath();
        String keysPath = context.getFileStreamPath("key.txt").getAbsolutePath();


        Runtime rt = Runtime.getRuntime();
        String[] commands = {zenroomPath, "-a", dataPath, "-k", keysPath, contractPath };
        Process proc = rt.exec(commands);

        BufferedReader stdInput = new BufferedReader(new
                InputStreamReader(proc.getInputStream()));

        BufferedReader stdError = new BufferedReader(new
                InputStreamReader(proc.getErrorStream()));

        StringBuilder sb = new StringBuilder();

        String s = null;
        while ((s = stdInput.readLine()) != null) {
            sb.append(s + "\n");
        }

        System.out.println("BEGIN zenrooom error output\n");
        while ((s = stdError.readLine()) != null) {
            System.out.println(s);
        }
        System.out.println("END zenrooom error output\n");

        return sb.toString();
    }

    private String copyZenroom() {
        try {
            InputStream ins = context.getResources().openRawResource(R.raw.zenroom);
            byte[] buffer = new byte[ins.available()];
            ins.read(buffer);
            ins.close();
            FileOutputStream fos = context.openFileOutput("zenroom", Context.MODE_PRIVATE);
            fos.write(buffer);
            fos.close();


            File file = context.getFileStreamPath("zenroom");
            file.setExecutable(true);

            return file.getAbsolutePath();

        } catch(Exception e) {
            Log.e("ERROR COPY ZENROOM", e.toString());
        }
        return null;
    }

}
