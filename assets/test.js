<<<<<<< HEAD
class Animal{
  constructor(name){
    this.name = name
    console.log('animal class, this >>', this)
  }

  speak(){
    console.log(`${this.name} makes a noise`)
  }

}

console.log(new Animal("cat").speak())

class cat extends Animal{
  constructor(name){
    super(name)
    console.log('cat class, this >>', this)
  }
  speak(){
    console.log(`${this.name} meows`)
  }
}
=======
class Animal{
  constructor(name){
    this.name = name
    console.log('animal class, this >>', this)
  }

  speak(){
    console.log(`${this.name} makes a noise`)
  }

}

console.log(new Animal("cat").speak())

class cat extends Animal{
  constructor(name){
    super(name)
    console.log('cat class, this >>', this)
  }
  speak(){
    console.log(`${this.name} meows`)
  }
}
>>>>>>> 251783cb1fe7b981fae3ef21b6d02defa119bec4
console.log(new cat("Harlot").speak())