$(function(){
    //轮播
    var index = 0;
    var lunbo = function(){
        $('.banner img').hide();
        var el = $('.banner img')[index];
        $(el).show();
        $('.title h3').hide();
        var els=$('.title h3')[index];
        $(els).show();
        $('.dians').removeClass('dians-s');
        $($('.dians')[index]).addClass('dians-s');
        index += 1;
        if( index === $('.dians').length ){
            index = 0;
        }
    };
    $('.dians').each(function(i){
        $(this).data('index',i);
    });
    $('.dians').hover(function(){
        clearInterval(timerId);
        $('.dians').removeClass('dians-s');
        $(this).addClass('dians-s');
        var i = $(this).data('index');
        $('.banner img').hide();
        $('.title h3').hide();

        $( $('.banner img')[i] ).show();
        $($('.title h3')[i]).show();
        index = i;
    },function(){
        clearInterval(timerId);
        timerId = setInterval(lunbo,2000);
    });
    var timerId = setInterval(lunbo,2000);

    //菜单列表
    var diqu,leixing,objsxc={};
    function res (){
        $.ajax({
            url:'http://192.168.2.163:8080/mytv/sort',
            type: 'get',
            dataType: 'jsonp',
            jsonp:'gmzjsonp',
            success: function(resp){
                if(resp.success==1){
                    var data=resp.result;
                    if(data.length>0){
                        var str=data.length;
                        $('.con').width(str*70+70);
                        $(data).each(function(index,obj){
                            var cid = obj.Id;
                            var el = $('.con');
                            el.append('<div class="but but-s" data-id="'+cid+'">'+obj.name+'</div>');
                            $('.but-s').click(function(){
                                objsxc.diqu='';
                                objsxc.leixing='';
                                $(".sc-fd").hide();
                                $(".jing").hide();
                                $('.xian3').show();
                                $('.ul-hot').children('li').remove();
                                $('.ul-hot1').children('li').remove();
                                $('.cnv').remove();
                                $('.table1').show();

                                $('.but').removeClass('buts');
                                $(this).addClass('buts');
                                var val=$(this).attr("data-id");
                                typ(val);
                                types(val);
                                $('.liebiao').show();
                                list(val,objsxc,1,10);

                            });
                            $('.but-j').click(function(){
                                $('.but').removeClass('buts');
                                $(this).addClass('buts');
                                $(".sc-fd").show();
                                $('.table1').hide();
                                $(".jing").show();
                                $('.xian3').hide();
                                $('.liebiao').hide();
                            });
                        });

                    }else{
                        return;
                    }
                }else if(resp.errorCode==""){
                    alert("加载出错");
                }
            },
            error: function(resp){
                var result = resp.result;
                alert(result);
            }
        });
    };
    res();

    //精选
    function selected(tos,to,mo,mod){
        $.ajax({
            url:'http://192.168.2.163:8080/mytv/sift?topLimitPage='+tos+'&topLimitNum='+to+'&moduleLimitPage='+mo+'&moduleLimitNum='+mod,
            type: 'get',
            dataType: 'jsonp',
            jsonp:'gmzjsonp',
            success: function(resp){
                if(resp.success==1){
                    var data=resp.result;
                    if(data.length>0){
                        $.each(data,function(i,index){
                            var lun=index.siftTop;
                            $.each(lun,function(q,imgs){
                                $('<img class="bana">').attr({"src":imgs.img_url}).appendTo($('.lunbo'));
                                $('<h3>').html(imgs.recommend).appendTo($('.titles'));
                                var veo_url=imgs.vIdeoPojo;
                                $('.bana').click(function(){
                                    location.href='veo_url.vIdeo_url';
                                    //console.log(veo_url.vIdeo_url);
                                });
                            });
                            var mokuai=index.siftModule;
                            var len=mokuai.length;
                            //console.log(len);
                            var content='<div class="sc-head"><div class="sou"><div class="ye-con"></div><div class="hot hot1"></div></div></div><div class="thumbs"><div class="thumb"><img src="images/1.jpg"></div><div class="title-video"><div class="titles-videos"><h3></h3></div></div></div><div class="m-list"><ul class="ul-hot1 ul-hot"></ul></div>';
                            for (var i=0;i<len;i++){
                                $('<div class="sc-con"></div>').html(content).appendTo($('.mokuai'));
                                $('.thumbs:first').css({"display":"none"});
                            }
                            $('.sc-con').prepend('<div class="clear"></div>');
                            $.each(mokuai,function(j,code){
                                //console.log(code);
                                $( $('.hot')[j]).html(code.name);
                                $('.ul-hot1').children('li').remove();
                                var vodeo=code.vIdeoList;
                                $.each(vodeo,function(k,cd){
                                    //console.log(cd);
                                    $($('.thumb img')[k]).attr("src",cd.img_url_module);

                                    $($('.titles-videos h3')[k]).html(cd.recommend);
                                    $($('.thumb img')[k]).click(function(){

                                    });
                                    var por=cd.vIdeoPojo;
                                    var veo=por.vIdeo_url;
                                    var as='<div class="hot-list"><a href="javascript:;" class="js-tu" data_url="'+veo+'"><div class="hot-pic"><img src='+por.img_url+'></div><h3>'+por.name+'</h3><h4>'+por.recommend+'</h4></a></div>';
                                    $('<li></li>').html(as).appendTo($('.ul-hot1'));
                                    $('.js-tu').click(function(){
                                       var veos=$(this).attr('data_url');
                                        //console.log(veos);
                                        location.href='por.vIdeo_url';
                                    });

                                });
                            });
                        });
                    }else{
                        return;
                    }
                }else if(resp.errorCode==""){
                    alert("加载出错");
                }
            },
            error: function(resp){
                var result = resp.result;
                alert(result);
            }
        });
    }
    selected(1,6,1,2);

    //菜单下地区
    function types(val){
        $.ajax({
            url:'http://192.168.2.163:8080/mytv/sort/'+val+'/area',
            type: 'get',
            dataType: 'jsonp',
            jsonp:'gmzjsonp',
            success: function(resp){
                if(resp.success==1){
                    var data=resp.result;
                    if(data.length>0){
                        var len=data.length;
                        var con2=$('.contain2');
                        con2.width(70*len+90);
                        con2.empty();
                        con2.prepend('<div class="cnv2 cnv-region cnvs">全部地区</div>');
                        $.each(data,function(i,index){
                            $('<div></div>').addClass("cnv cnv-region").html(index.name).appendTo(con2);
                            $('.cnv-region').click(function(){
                                $('.ul-hot').empty();
                                $('.cnv-region').removeClass("cnvs");
                                $(this).addClass("cnvs");
                                diqu=$(this).html();
                                if(diqu=="全部地区"){
                                    objsxc.diqu='';
                                }else{
                                    objsxc.diqu = diqu;
                                }
                                list(val,objsxc,1,10);
                            });
                        });
                    }else{
                        return;
                    }
                }else if(resp.errorCode==""){
                    alert("加载出错");
                }
            },
            error: function(resp){
                var result = resp.result;
                alert(result);
            }
        });
    }
    //菜单下类型
    function typ(val){
        $.ajax({
            url:'http://192.168.2.163:8080/mytv/sort/'+val+'/classify',
            type: 'get',
            dataType: 'jsonp',
            jsonp:'gmzjsonp',
            success: function(resp){
                if(resp.success==1){
                    var data=resp.result;
                    if(data.length>0){
                        var lens=data.length;
                        var con1=$('.contain1');
                        con1.width(70*lens+90);
                        con1.empty();
                        con1.prepend('<div class="cnv3 cnv-type cnvs">全部类型</div>');
                        $.each(data,function(i,indexs){
                            $('<div></div>').addClass("cnv cnv-type").html(indexs.name).appendTo(con1);
                            $('.cnv-type').click(function(){
                                $('.ul-hot').empty();
                                $('.cnv-type').removeClass("cnvs");
                                $(this).addClass("cnvs");
                                leixing=$(this).html();
                                if(leixing=="全部类型"){
                                    objsxc.leixing='';
                                }else{
                                    objsxc.leixing = leixing;
                                }
                                list(val,objsxc,1,10);
                            });
                        });
                    }else{
                        return;
                    }
                }else if(resp.errorCode==""){
                    alert("加载出错");
                }
            },
            error: function(resp){
                var result = resp.result;
                alert(result);
            }
        });
    }
    if(objsxc.diqu={}){
        objsxc.diqu='';
    }
    if(objsxc.leixing={}){
        objsxc.leixing='';
    }
    //列表
    function list(val,objsxc,lim,num){
        are=objsxc.diqu;
        cla=objsxc.leixing;
        $.ajax({
            url:'http://192.168.2.163:8080/mytv/sort/'+val+'/video?areaId='+are+'&classifyId='+cla+'&limitPage='+lim+'&limitNum='+num+'',
            type: 'get',
            dataType: 'jsonp',
            jsonp:'gmzjsonp',
            success: function(resp){
                if(resp.success==1){
                    var data=resp.result;
                    if(data.length>0){
                        $('.ul-hot').empty();
                        $.each(data,function(i,index){
                            var as='<div class="hot-list"><a href="javascript:;" class="js-tu"><div class="hot-pic"><img src='+index.img_url+'></div><h3>'+index.name+'</h3><h4>'+index.recommend+'</h4></a></div>';
                            var aa=$('.ul-hot');
                            $('<li></li>').html(as).appendTo(aa);
                            $('.js-tu').click(function(){
                                location.href='index.vIdeo_url';
                            });
                        });
                    }else{
                        return;
                    }
                }else if(resp.errorCode==""){
                    alert("加载出错");
                }
            },
            error: function(resp){
                var result = resp.result;
                alert(result);
            }
        });
    }

    //搜索
    $('.sc-fd').click(function(){
        $('.table1').hide();
        $('.win').hide();
        $('.sc-find').hide();
        $('.jing').hide();
        $('.liebiao').hide();
        $('.search-w').show();
    });
    //搜索值
    $('.search-k-x').click(function(){
        $('#su').val('');
        $('.search-k-x').hide();
        $('.search-q-j').show();
        $('.search-q-k').hide();
    });

    //焦点
    var text=$('#su');
    text.focus(function(){
        $('#su').val('');
        $('.search-k-x').hide();
        $('.search-q-j').hide();
        $('.search-q-k').show();
        text.keyup(function(){
            var va=$(this).val();
            va = $.trim(va);
            if(va.length>0){
                $('.search-k-x').show();
                $('.search-q-j').hide();
                $('.search-q-k').show();
            }else{
                $('.search-k-x').hide();
                $('.search-q-j').show();
                $('.search-q-k').hide();
            }

        })
    });
    text.blur(function() {
        var str = $(this).val();
        str = $.trim(str);
        if(str == ''){
            $('#su').val('搜索项目');
            $('.search-q-j').show();
            $('.search-q-k').hide();
        }
    });

    //搜搜返回
    $('.search-q-j').click(function(){
        $('.win').show();
        $('.sc-find').show();
        $('.jing').show();
        $('.search-w').hide();
        $('#su').val('搜索项目');
        $('.hot-search').show();
        $('.kong').hide();
    });

   //搜索结果
    $('.search-q-k').click(function(){
        $('.ul-hot').empty();
        $('.kong').hide();
        var va=text.val();
        va = $.trim(va);
        var lims= 1,nums=10;
        $.ajax({
            url:'http://192.168.2.163:8080/mytv/sift/search?name='+va+'&limitPage='+lims+'&limitNum='+nums+'',
            type: 'get',
            dataType: 'jsonp',
            jsonp:'gmzjsonp',
            success: function(resp){
                if(resp.success==1){
                    var data=resp.result;
                    if(data.length>0){
                        $('.hot-search').hide();
                        $('.liebiao').show();
                        $('.ul-hot').empty();
                        $.each(data,function(j,indexa){
                            $('.ul-hot').append('<li style="margin-top: 16px;"><div class="hot-list"><a href="javascript:;" class="js-hv"><div class="hot-pic"><img src='+indexa.img_url+'></div><h3>'+indexa.name+'</h3><h4>'+indexa.recommend+'</h4></a></div></li>');
                            $('.js-hv').click(function(){
                                location.href='indexa.vIdeo_url';
                            });
                        })
                    }else{
                        $('.hot-search').hide();
                        $('.kong').show();
                    }
                }else if(resp.errorCode==" "){
                    alert("加载出错");
                }
            },
            error: function(resp){
                var result = resp.result;
                alert(result);
            }
        });
    });
    //返回顶部
    $('.top').click(function(){
        $({top: $(window).scrollTop()}).animate(
            {top: 0},
            {
                duration: 700,
                step: function(){
                    $(window).scrollTop(this.top);
                }
            }
        );
    });




});


