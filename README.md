# Measure-Builder
Build complex expression with easy steps

# Usage
<ol>
<li>
The creation of a new measure starts with the definition of the measure.

It requires the name of the variable and a description.
<img src = "https://raw.github.com/LorisLombardo87/Measure-Builder/master/img/1demo.gif"/><br>
</li>

<li>
Then you must define the function and the field on which to work

The field must be written as in the model. The extension makes no existence check on the value written
<img src = "https://raw.github.com/LorisLombardo87/Measure-Builder/master/img/2demo.gif"/><br>
</li>

<li>
now you have to define the dataset you want to use.

First, you have to choose where to start: current selections or whole data set.

Then you can choose to modify that set based on some rules:
<ul>
<li><b>Clear a selection</b>. You can ignore a selection on a particular field</li>
<li><b>Add by Value</b>. You can add a selection by defining a value to select</li>
<li><b>Add by Expression</b>. You can add a selection depending on the result of the expression prompted</li>
</ul>

<img src = "https://raw.github.com/LorisLombardo87/Measure-Builder/master/img/3demo.gif"/><br>
</li>

<li>
Lastly you can test your measure and save it

it could be useful to test your expression, so you can define a dimension for test the expression. Clikcing on test button will show a table with that dimension and the expression built.

if you found some error you can navigate the tab and correct what's worng.

Now you can save it! The espression will be called pasting the reference.
<img src = "https://raw.github.com/LorisLombardo87/Measure-Builder/master/img/4demo.gif"/><br>
</li>

<li>
if you want modify the expression after a while you can do it by recalling it in the measure builder.

Only the measure build whit this extension can be modified.
</li>

#Roadmap
<ul>
<li>add typeahead for field </li>
<li>add typeahead for values </li>
<li>add number format </li>
</ul>
