[deploy](https://brave-engelbart-e56963.netlify.app/) </br>
Задача в этом была сделать приложение, которое нарисует идеальный круг, несмотря ни на что. Для реализации этого я выбрал canvas, который, насколько я знаю создан как раз для решения подобных задач. При регистрации клика программа начинает записывать все уникальные координаты, а затем на основе них высчитывает центр и диаметр по осям, на основе которых высчитывается средний радиус. Для доступа к canvas api использовался хук useRef 
