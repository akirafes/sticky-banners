(function($, window) {

    var $this;

    function rebuldSticky() {
        $this.stickyElements.each(function(){
            if($(this).hasClass('widget_ten_dfp_widget')) {
                var banner = $(this).children();
                var sticky =  $(banner).data('stickyPos') == undefined ? 0 : $(banner).data('stickyPos');
                var html = '<div class="element"> \
                        <div class="sticky-content" ></div> \
                        <div class="sticky-height" ></div> \
                        </div>';
                var parent =  $(banner).parent();
                var altura = $(banner).outerHeight(true);
                parent.append(html);
                var stickyContent = parent.find('.sticky-content');
                $(banner).appendTo(stickyContent);
                console.log(sticky, altura);
                if(altura + sticky < $this.temp) {
                    parent.find('.sticky-height').css({ height : altura + sticky + 'px'});
                    stickyContent.fixer({
                        gap: 0,
                        calculateGap: function(){
                            return 45;
                        },
                        onSticky: function(e) {
                            console.log('Me pegue',stickyContent.parent().parent().attr('id'),e,sticky);
                        },
                        onSticky2: function(e) {
                            console.log('Me Despegue',stickyContent.parent().parent().attr('id'),e,sticky);
                        }/*,
                        onSticky1: function(e) {
                            console.log('No se',stickyContent);
                        }*/
                    });
                }
            }

        });

    }

    $.fn.tenDfpSidebar = function(options) {
        $this = this;
        $this.originalContentHeight = $this.parent().find('.content').outerHeight(true);
        $this.stickyElements = $this.find('.widget>div:not(.display-none)').parent();

        //console.log($this.children('.theiaStickySidebar').children());
        $this.temp = $this.originalContentHeight;
        rebuldSticky();
        if (typeof ResizeSensor !== 'undefined') {
            $this.stickyElements.find('.sticky-content').each(function(index,element){
                new ResizeSensor(element, function () {

                    console.log(element);

                });
            });

        }
    };
}(jQuery, window));
