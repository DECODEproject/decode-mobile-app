package net.decode.zenroom;


import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ZenroomModule extends ReactContextBaseJavaModule {

    private static final String E_ZENROOM = "E_ZENROOM";

    public ZenroomModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void execute(String contract, String data, String key, Promise promise) {
        if (data == null) {
            data = "{}";
        }
        if (key == null) {
            key = "{}";
        }


        ZenroomExecutor z = new ZenroomExecutor(this.getReactApplicationContext());

        String output = "";
        try {
            output = z.execute(contract, data, key);
        } catch (Exception e) {
            Log.e("Zenroom", "Error while using native zenroom", e);
            promise.reject(E_ZENROOM, e);
        }

        promise.resolve(output);
    }

    @Override
    public String getName() {
        return "Zenroom";
    }
}
