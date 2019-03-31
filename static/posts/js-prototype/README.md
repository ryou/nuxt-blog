---
created_at: 2019-02-05
---

# プロトタイプチェーンを利用した継承のサンプル

プロトタイプチェーンに関して実際に手を動かさないとよくわからなかったのでメモ程度に

```
// Person Class
var Person = function(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};
Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Student Class
var Student = function(firstName, lastName, age, school, grade) {
  this.school = school;
  this.grade = grade;

  // 親コンストラクタの呼び出し
  Person.call(this, firstName, lastName, age);
};
Student.prototype.rollCall = function() {
  return `${this.school} ${this.grade}`;
};

// Studentの__proto__にPerson.prototypeが設定される
Object.setPrototypeOf(Student.prototype, Person.prototype);

var takashi = new Student(
  '松下',
  '隆',
  18,
  '松山高校',
  '3年'
);

console.log(takashi.getFullName());
console.log(takashi.rollCall());
```

## 参考

[Google流 JavaScript におけるクラス定義の実現方法](https://www.yunabe.jp/docs/javascript_class_in_google.html)
