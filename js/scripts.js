function formatValue(value) {
  return parseFloat(value).toPrecision(2);
}

function update() {
  var range = $('input[name=range]:checked', 'form').val();
  range = eval(range);

  var values = [];

  var softmaxDenominator = 0;

  $('.inputs input[type=range]').each(function(index) {
    var $slider = $(this);
    var $label = $("label[for='" + $slider.attr('id') + "']");
    var value = $slider.val();
    value = range[0] + (range[1] - range[0]) * value;
    values.push(value);
    softmaxDenominator += Math.exp(value);
    $label.text(formatValue(value));
  });

  $('.outputs input[type=range]').each(function(index) {
    var $slider = $(this);
    var $label = $("label[for='" + $slider.attr('id') + "']");
    var softmaxValue = Math.exp(values[index]) / softmaxDenominator;
    $label.text(formatValue(softmaxValue));
    $slider.val(softmaxValue);
  });
}

$("input").on("input change", function() {
  update();
});

update();
