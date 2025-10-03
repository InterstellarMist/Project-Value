package com.project_value.dev

import android.os.Bundle
import android.view.KeyEvent
import android.webkit.WebView
import androidx.activity.OnBackPressedCallback
import androidx.activity.enableEdgeToEdge

class MainActivity : TauriActivity() {
  private lateinit var wv: WebView

  override fun onWebViewCreate(webView: WebView) {
    wv = webView
  }

  private fun handleBackPress(): Boolean {
    if (!::wv.isInitialized) return false

    wv.evaluateJavascript(
            /* script = */ """
    try {
        window.androidBackCallback()
    } catch (_) {
      true
    }
    """.trimIndent()
    ) { result ->
      if (result == "true") {
        finish()
      }
    }
    return true
  }

  override fun dispatchKeyEvent(event: KeyEvent): Boolean {
    if (event.keyCode == KeyEvent.KEYCODE_BACK && event.action == KeyEvent.ACTION_DOWN) {
      return handleBackPress()
    }
    return super.dispatchKeyEvent(event)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)

    // Modern back button handling
    onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
              override fun handleOnBackPressed() {
                handleBackPress()
              }
            }
    )
  }
}
