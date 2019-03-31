---
created_at: 2018-04-16
---

# シーンをフェード遷移させるプレハブ

[シーンの遷移とフェードを管理するクラス【Unity】【uGUI】 - (:3[kanのメモ帳]](http://kan-kikuchi.hatenablog.com/entry/SceneNavigator)

シーンのフェード遷移に関しては、上記リンク先に参考とすべきコードがあるが、自分がコードの内容を完全に理解しきれておらず、理解しきれていないコードを使うことに抵抗があるため簡単なものを自作してみた。

## ヒエラルキー構成

+ GameObject (SceneTransitionerをアタッチ)
	+ Canvas (CanvasFaderをアタッチ)
		+ Panel

## CanvasFader

```
using System;
using UnityEngine;

public class CanvasFader : MonoBehaviour
{

    private enum State
    {
        Idle,
        Fading,
    }

    public float duration = 1.0f;

    private CanvasGroup canvasGroup;
    private event Action onFadeComplete;
    private State currentState = State.Idle;

    private float startAlpha;
    private float targetAlpha;

    private void Awake()
    {
        var tmpCanvasGroup = this.GetComponent<CanvasGroup>();
        if (tmpCanvasGroup == null)
        {
            tmpCanvasGroup = this.gameObject.AddComponent<CanvasGroup>();
        }
        this.canvasGroup = tmpCanvasGroup;
    }

    // Update is called once per frame
    void Update()
    {
        if (!IsFading()) return;

        var fadeProgressPerSecond = (this.targetAlpha - this.startAlpha) / this.duration;
        var fadeProgress = fadeProgressPerSecond * Time.deltaTime;

        this.canvasGroup.alpha += fadeProgress;

        // フェード処理完了
        if (this.canvasGroup.alpha >= 1.0f || this.canvasGroup.alpha <= 0)
        {
            if (this.canvasGroup.alpha > 1.0f)
            {
                this.canvasGroup.alpha = 1.0f;
            }
            else if (this.canvasGroup.alpha < 0)
            {
                this.canvasGroup.alpha = 0;
            }

            this.currentState = State.Idle;
            this.onFadeComplete();
        }
    }

    void Fade(float inStartAlpha, float inTargetAlpha, Action inOnFadeComplete = null)
    {
        if (IsFading()) return;

        this.canvasGroup.alpha = this.startAlpha = inStartAlpha;
        this.targetAlpha = inTargetAlpha;
        this.onFadeComplete = inOnFadeComplete;
        this.currentState = State.Fading;
    }

    public void FadeIn(Action inOnFadeComplete = null)
    {
        Fade(0, 1.0f, inOnFadeComplete);
    }

    public void FadeOut(Action inOnFadeComplete = null)
    {
        Fade(1.0f, 0, inOnFadeComplete);
    }

    public bool IsFading()
    {
        return this.currentState == State.Fading;
    }
}
```

## SceneTransitioner

```
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneTransitioner : MonoBehaviour {

    private GameObject canvas = null;
    private CanvasFader fader = null;

	// Use this for initialization
	void Start () {
        this.canvas = this.transform.Find("Canvas").gameObject;
        this.fader = this.canvas.GetComponent<CanvasFader>();

        this.fader.FadeOut(() => {
            this.canvas.SetActive(false);
        });
	}

    public void SceneTransition(string sceneName)
    {
        this.canvas.SetActive(true);
        this.fader.FadeIn(() => {
            SceneManager.LoadScene(sceneName);
        });
    }
}
```

## 使い方

上記コンポーネントをプレハブ化し、各シーンに配置。

遷移の際に、`SceneTransitioner.SceneTransition`を呼び出せばフェード遷移してくれる。
