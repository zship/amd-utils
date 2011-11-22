//
// Note that this code was written really fast and isn't flexible/elegant at
// all it shouldn't be used as reference.
//

(function ($) {


    var _srcUrl = 'https://github.com/millermedeiros/amd-utils/blob/master/src/',
        _specsUrl = 'https://github.com/millermedeiros/amd-utils/blob/master/tests/spec/',
        _curPath = document.location.pathname.split('/'),
        _curFile = _curPath[_curPath.length - 1],
        _curMod = _curFile.split('.')[0];


    var sidebar = (function () {

        var $_sidebar,
            $_search,
            $_toc,
            $_tocList,
            $_tocItems;


        function init() {
            $_sidebar = $('<div id="sidebar" />').prependTo('#wrapper');
            $.get('_toc.html').done(onTocLoad);
        }

        function onTocLoad(data) {
            $_sidebar.append(data);

            $_search = $('#search');
            $_toc = $_sidebar.find('.toc');
            $_tocList = $_toc.find('.toc-list');
            $_tocItems = $_tocList.find('.toc-item');

            $_tocList.slideUp(0);
            $_sidebar.on('click', 'h3', toggleNavOnClick);
            $('#show-desc').on('change', toggleDescription);
            toggleDescription();
            $_search.on('keyup blur', filterOnSearch);

            $_sidebar.find('.toc-mod-title:has(a[href*="'+ _curFile +'"])').click();

        }

        function toggleNavOnClick(evt) {
            var $el = $(this);
            $el.toggleClass('opened');
            $el.next('.toc-list').stop(true, true).slideToggle(300);
        }

        function toggleDescription() {
            $_toc.find('.desc').toggleClass('hidden');
        }

        function filterOnSearch(evt) {
            var term = $_search.val(),
                rTerm;

            $_tocItems.toggleClass('hidden', !!term);
            $_toc.find('.toc-mod-title').toggleClass('hidden', !!term);

            if(term){
                rTerm = new RegExp(term, 'gi');
                $_toc.find('.toc-mod-title').addClass('hidden');

                $_tocList.stop(true).slideDown(0);

                $_tocItems
                    .filter(function(){
                        return rTerm.test( $(this).text() );
                    })
                    .removeClass('hidden');

            } else {
                $_tocList.stop(true).slideUp(0);
            }

        }

        return {
            init : init
        };

    }());


    // ---

    var syntax = {
        init : function(){
            SyntaxHighlighter.autoloader(
              'applescript            _assets/js/lib/syntax-highlighter/shBrushAppleScript.js',
              'actionscript3 as3      _assets/js/lib/syntax-highlighter/shBrushAS3.js',
              'bash shell             _assets/js/lib/syntax-highlighter/shBrushBash.js',
              'coldfusion cf          _assets/js/lib/syntax-highlighter/shBrushColdFusion.js',
              'cpp c                  _assets/js/lib/syntax-highlighter/shBrushCpp.js',
              'c# c-sharp csharp      _assets/js/lib/syntax-highlighter/shBrushCSharp.js',
              'css                    _assets/js/lib/syntax-highlighter/shBrushCss.js',
              'delphi pascal          _assets/js/lib/syntax-highlighter/shBrushDelphi.js',
              'diff patch pas         _assets/js/lib/syntax-highlighter/shBrushDiff.js',
              'erl erlang             _assets/js/lib/syntax-highlighter/shBrushErlang.js',
              'groovy                 _assets/js/lib/syntax-highlighter/shBrushGroovy.js',
              'java                   _assets/js/lib/syntax-highlighter/shBrushJava.js',
              'jfx javafx             _assets/js/lib/syntax-highlighter/shBrushJavaFX.js',
              'js jscript javascript  _assets/js/lib/syntax-highlighter/shBrushJScript.js',
              'perl pl                _assets/js/lib/syntax-highlighter/shBrushPerl.js',
              'php                    _assets/js/lib/syntax-highlighter/shBrushPhp.js',
              'text plain             _assets/js/lib/syntax-highlighter/shBrushPlain.js',
              'py python              _assets/js/lib/syntax-highlighter/shBrushPython.js',
              'ruby rails ror rb      _assets/js/lib/syntax-highlighter/shBrushRuby.js',
              'sass scss              _assets/js/lib/syntax-highlighter/shBrushSass.js',
              'scala                  _assets/js/lib/syntax-highlighter/shBrushScala.js',
              'sql                    _assets/js/lib/syntax-highlighter/shBrushSql.js',
              'vb vbnet               _assets/js/lib/syntax-highlighter/shBrushVb.js',
              'xml xhtml xslt html    _assets/js/lib/syntax-highlighter/shBrushXml.js'
            );

            SyntaxHighlighter.all();
        }
    };


    var source = (function () {

        function init(){
            var mod,
                $h2 = $('h2'),
                $ul = $('<ul class="nav nav-src"><li><a href="#" class="a-src">Source</a></li><li><a href="#" class="a-specs">Specs</a></li></ul>'),
                $tmp;

            $h2.each(function(i, el){
                mod = $(el).find('a').attr('href').replace('#', '');
                if (mod !== 'toc') {
                    $tmp = $ul.clone();
                    $tmp.find('.a-src').attr('href', _srcUrl + _curMod +'/'+ mod +'.js');
                    $tmp.find('.a-specs').attr('href', _specsUrl + _curMod +'/spec-'+ mod +'.js');
                    $(this).append($tmp).addClass('h2-mod');
                }
            });
        }

        return {
            init : init
        };
    }());

    // ----


    function init(){
        sidebar.init();
        syntax.init();
        if(_curMod !== 'index'){
            source.init();
        }
    }

    $(document).ready(init);

}(jQuery));
