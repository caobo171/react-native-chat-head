package com.floatingbubble;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.os.Bundle;
import android.os.Build;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.content.Intent;
import android.provider.Settings;
import android.net.Uri;

import java.util.ArrayList;


public class RNChatHeadModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static final int CODE_DRAW_OVER_OTHER_APP_PERMISSION = 2084;

    private ArrayList<String> notiArray ;


    public RNChatHeadModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

    }

    @Override
    public String getName() {
        return "RNChatHead";
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void showFloatingBubble(int x, int y, final Promise promise) {
        try {
//            this.addNewBubble(x, y);
            promise.resolve("");
        } catch (Exception e) {
            promise.reject("");
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void hideFloatingBubble(final Promise promise) {
        try {
//            this.removeBubble();
            promise.resolve("");
        } catch (Exception e) {
            promise.reject("");
        }
    }


    @ReactMethod // Notates a method that should be exposed to React
    public boolean initialize(String uri) {
        try {
            Intent intent = new Intent(reactContext,ChatHeadService.class);
            intent.putExtra("uri", uri);
            reactContext.startService(intent);
            return true;

        } catch (Exception e) {
            return  false;
        }
    }



    @ReactMethod
    public void receiveMessage (String id , String photoUrl, String content, Integer notiNumber , String data  ){
        Intent intent = new Intent(reactContext, ChatHeadService.class);
        intent.putExtra("uri", photoUrl);
        intent.putExtra("content", content);
        intent.putExtra("notiNumber", notiNumber);
        intent.putExtra("data", data);
        reactContext.startService(intent);
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void requestPermission(final Promise promise) {
        try {
            this.requestPermissionAction(promise);
        } catch (Exception e) {
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void checkPermission(final Promise promise) {
        try {
            promise.resolve(hasPermission());
        } catch (Exception e) {
            promise.reject("");
        }
    }





    public void requestPermissionAction(final Promise promise) {
        if (!hasPermission()) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + reactContext.getPackageName()));
            Bundle bundle = new Bundle();
            reactContext.startActivityForResult(intent, 0, bundle);
        }
        if (hasPermission()) {
            promise.resolve("");
        } else {
            promise.reject("");
        }
    }

    private boolean hasPermission(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return Settings.canDrawOverlays(reactContext);
        }
        return true;
    }


}
