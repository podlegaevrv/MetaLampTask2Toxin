import 'air-datepicker/dist/css/datepicker.min.css'
import 'air-datepicker/dist/js/datepicker.min'
import './date-dropdown.scss'


$(document).ready(() => {
  let select_date = '';
  let two_select_date = '';

  $('#filter-dropdown').datepicker({
    range: true,
    multipleDatesSeparator: ' - ',
    dateFormat: 'dd M',
    clearButton: true,
    navTitles: {
      days: 'MM yyyy'
    },
    startDate: new Date(),
    prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z"/></svg>',
    nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z"></svg>',
    onShow: function (dp, animationCompleted){
      if(!animationCompleted){
        if (dp.$datepicker.find('span#apply').html()===undefined){
          dp.$datepicker[0].children[3].innerHTML += '<span id="apply" class="datepicker--button">Применить</span>'
          dp.$datepicker.find('span#apply').click(function (event){
            dp.$el[0].value = select_date;
            dp.hide();
          });
        }
      }
    },
    onSelect: function (formattedDate, date, dp) {
      select_date = formattedDate;
      dp.$el[0].value = '';
    }
  });

  $('#filter-dropdown').val('19 авг - 23 авг')



  $('#start').datepicker({
    range: true,
    prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z"/></svg>',
    nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z"></svg>',
    clearButton: true,
    dateFormat: 'dd.mm.yyyy',
    navTitles: {
      days: 'MM yyyy'
    },
    onShow: function (dp, animationCompleted){
      if(!animationCompleted){
        if (dp.$datepicker.find('span#apply').html()===undefined){
          dp.$datepicker[0].children[3].innerHTML += '<span id="apply" class="datepicker--button">Применить</span>'
          dp.$datepicker.find('span#apply').click(function (event){
            $('#start').val(two_select_date.split(',')[0]);
            $('#end').val(two_select_date.split(',')[1]);
            dp.hide();
          });
        }
      }
    },
    onSelect: function (formattedDate, date, dp) {
      two_select_date = formattedDate;
      dp.$el[0].value = '';
    }
  });

  $('#start').val('ДД.ММ.ГГГГ')
  $('#end').val('19.08.2019')

  /*$('.test-inline').datepicker({
    clearButton: true,
    range: true,
    navTitles: {
      days: 'MM yyyy'
    },
    prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z"/></svg>',
    nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z"></svg>'
  });
  $('.test-inline').data('datepicker').$datepicker[0].children[3].innerHTML += '<span class="datepicker--button">Применить</span>';
*/


});