/**
 * This class contains the JNI bindings for the native Zenroom library.
 * It's package and method names are tied to it, be careful if you need changing them
 */

package decode.zenroom;

public class Zenroom {

    public native String zenroom(String script, String conf, String key, String data);

    public String execute(String script, String conf, String key, String data) {
        return zenroom(script, conf, key, data);
    }
}
