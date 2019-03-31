---
created_at: 2017-05-15
---

# CSSでIOSっぽいトグルボタン

## 参考

[CSS iOS 7 toggle button](https://codepen.io/o_ti/pen/bkEco/)

## 詳細

[Demo](./examples/example01.html)

### HTML

```
<label class="m-iosToggle">
  <input type="checkbox" class="m-iosToggle_input js-checkbox">
  <span class="m-iosToggle_btn"></span>
</label>
```

### CSS

```
.m-iosToggle {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.m-iosToggle .m-iosToggle_input {
  display: none;
}
.m-iosToggle .m-iosToggle_btn {
  display: block;
  width: 51px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #e5e5e5;
  transition: .2s;
  box-sizing: border-box;
}
.m-iosToggle .m-iosToggle_btn:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  box-shadow: rgba(0,0,0,0.25) 0 0 1px 0, rgba(0,0,0,0.15) 0 3px 3px 0;
  background: #fff;
  transition: .2s;
}
.m-iosToggle .m-iosToggle_input:checked + .m-iosToggle_btn {
  border-color: #1abc9c;
  background: #1abc9c;
}
.m-iosToggle .m-iosToggle_input:checked + .m-iosToggle_btn:before {
  left: 21px;
}
```

### JS

JSはチェックした際、チェックを外した際に何か処理をしたい際に必要。（AjaxでAPI叩いたり）

見た目の実装には関わっていない。

```
var $component = $('.js-checkbox');
$component.on('change', function() {
  var isChecked = $component.prop('checked');

  if (isChecked) {
    console.log('checked');
  } else {
    console.log('unchecked');
  }
});
```
