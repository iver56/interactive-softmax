function formatValue(value) {
  return parseFloat(Math.round(value * 100) / 100).toFixed(2);
}

function update() {
  var values = [];

  $('.inputs input[type=range]').each(function(index) {
    var $slider = $(this);
    var $label = $("label[for='" + $slider.attr('id') + "']");
    var value = $slider.val();
    values.push(value);
    $label.text(formatValue(value));
  });

  var softmaxDenominator = 0;
  for (value of values) {
    softmaxDenominator += Math.exp(value);
  }

  $('.outputs input[type=range]').each(function(index) {
    var $slider = $(this);
    var $label = $("label[for='" + $slider.attr('id') + "']");
    var softmaxValue = Math.exp(values[index]) / softmaxDenominator;
    var value = $slider.val(softmaxValue);
    $label.text(formatValue(softmaxValue));
  });
}

$("input[type=range]").on("input change", function() {
  update();
});

update();
