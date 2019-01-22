package decode.zenroom;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ZenroomModule extends ReactContextBaseJavaModule {

    static {
        try {
            System.loadLibrary("zenroom");
            System.out.println("Loaded zenroom native library");
        } catch (Throwable exc) {
            System.out.println("Could not load zenroom native library: " + exc.getMessage());
        }
    }

    private static final String E_ZENROOM = "E_ZENROOM";

    public ZenroomModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Zenroom";
    }

    @ReactMethod
    public void execute(String contract, String data, String key, Promise promise) {
        if (data == null) {
            data = "";
        }
        if (key == null) {
            key = "";
        }

        try {
            System.out.println("Before native zenroom execute");
            String output = (new Zenroom()).execute(contract, "", key, data);
            System.out.println("Zenroom returns: " + output);
            promise.resolve(output);
        } catch (Exception e) {
            System.out.println("Error while calling native zenroom: " + e.getMessage());
            promise.reject(E_ZENROOM, e);
        }
    }
}
