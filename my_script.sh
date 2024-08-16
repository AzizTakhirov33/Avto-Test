#!/bin/bash

# Исходный HTML-код
html_code=$(cat <<'EOF'
<div class="home-box custom-box">
        <h3>E-Avto-test</h3>
        <p>OPTION 1 <span class="total-question">5</span></p>
        <a href="Option_1/index.html"><button type="button" 
class="btn">Start Quiz</button></a>
    </div>
EOF
)

# Новый файл для записи всех копий
output_file="output.html"

# Удаляем файл, если он существует
rm -f $output_file

# Цикл от 1 до 100
for i in {1..100}; do
    # Заменяем значения в HTML-коде и добавляем его в файл
    echo "${html_code//OPTION 1/OPTION $i}" | sed "s/Option_1/Option_$i/g" 
>> $output_file
    echo "" >> $output_file  # Добавляем пустую строку для разделения блоков
done

