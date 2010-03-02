
var RedBox = {

  isIE6: null,
  
  usingIE6: function ()
  {
    if (this.isIE6 == null) {
      this.isIE6 = (this.getInternetExplorerVersion() == 6);
    }

    return(this.isIE6);
  },
  
  getInternetExplorerVersion: function()
  // Returns the version of Internet Explorer or a -1
  // (indicating the use of another browser).
  {    
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    }
    return rv;
  },  

  showInline: function(id)
  {
    this.showOverlay();
    new Effect.Appear('RB_window', {duration: 0.4, queue: 'end'});        
    Element.scrollTo('RB_window');
    this.cloneWindowContents(id);
  },

  loading: function()
  {
    this.showOverlay();
    Element.show('RB_loading');
    //this.setWindowPosition();
  },

  addHiddenContent: function(id)
  {
    this.removeChildrenFromNode($('RB_window'));
    this.moveChildren($(id), $('RB_window'));
    Element.hide('RB_loading');
    new Effect.Appear('RB_window', {duration: 0.4, queue: 'end'});  
    Element.scrollTo('RB_window');
    this.setWindowPosition();
  },

  close: function()
  {
    new Effect.Fade('RB_window', {duration: 0.4});
    new Effect.Fade('RB_overlay', {duration: 0.4});
  },

  showOverlay: function()
  {
    if ($('RB_redbox'))
    {
      Element.update('RB_redbox', "");
      new Insertion.Top($('RB_redbox'), '<div id="RB_window" style="display: none;"></div><div id="RB_overlay" style="display: none;"></div>');  
    }
    else
    {
      new Insertion.Bottom(document.body, '<div id="RB_redbox" align="center"><div id="RB_window" style="display: none;"></div><div id="RB_overlay" style="display: none;"></div></div>');      
    }
    
    if (this.usingIE6()) {
      new Insertion.Top('RB_window', '<iframe id="RB_iframe" frameborder=1 style="display:none;"></iframe>');
    }
    new Insertion.Top('RB_overlay', '<div id="RB_loading" style="display: none"></div>');

    this.setOverlaySize();
    new Effect.Appear('RB_overlay', {duration: 0.4, to: 0.4, queue: 'end'});
    if (this.usingIE6()) {
      new Effect.Appear('RB_iframe');
    }
  },

  setOverlaySize: function()
  {
    if (window.innerHeight && window.scrollMaxY)
    {  
      yScroll = window.innerHeight + window.scrollMaxY;
    } 
    else if (document.body.scrollHeight > document.body.offsetHeight)
    { // all but Explorer Mac
      yScroll = document.body.scrollHeight;
    }
    else
    { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      yScroll = document.body.offsetHeight;
    }
    $("RB_overlay").style['height'] = yScroll +"px";
  },

  setWindowPosition: function()
  {
    var pagesize = this.getPageSize();  
  
    $("RB_window").style['width'] = 'auto';
    $("RB_window").style['height'] = 'auto';

    var dimensions = Element.getDimensions($("RB_window"));
    var width = dimensions.width;
    var height = dimensions.height;        
    
    $("RB_window").style['left'] = ((pagesize[0] - width)/2) + "px";
    $("RB_window").style['top'] = ((pagesize[1] - height)/4) + "px";
    
    if (this.usingIE6()) {
      $("RB_iframe").style['position'] = "absolute";
      $("RB_iframe").style['width'] = width + "px";
      $("RB_iframe").style['height'] = height + "px";
      $("RB_iframe").style['zIndex'] = -1;
    }
  },


  getPageSize: function() {
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
  
    arrayPageSize = new Array(w,h) 
    return arrayPageSize;
  },

  removeChildrenFromNode: function(node)
  {
    while (node.hasChildNodes())
    {
      node.removeChild(node.firstChild);
    }
  },

  moveChildren: function(source, destination)
  {
    while (source.hasChildNodes())
    {
      destination.appendChild(source.firstChild);
    }
  },

  cloneWindowContents: function(id)
  {
    var content = $(id).cloneNode(true);
    content.style['display'] = 'block';
    $('RB_window').appendChild(content);  

    this.setWindowPosition();
  }

}