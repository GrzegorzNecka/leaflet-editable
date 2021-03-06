var startPoint = [43.1249, 1.254];
var map = L.map("map", { editable: true }).setView(startPoint, 16),
  tilelayer = L.tileLayer(
    "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      maxZoom: 20,
      attribution:
        'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
    }
  ).addTo(map);

L.EditControl = L.Control.extend({
  options: {
    position: "topleft",
    callback: null,
    kind: "",
    html: ""
  },

  onAdd: function(map) {
    var container = L.DomUtil.create("div", "leaflet-control leaflet-bar"),
      link = L.DomUtil.create("a", "", container);

    link.href = "#";
    link.title = "Create a new " + this.options.kind;
    link.innerHTML = this.options.html;
    L.DomEvent.on(link, "click", L.DomEvent.stop).on(
      link,
      "click",
      function() {
        window.LAYER = this.options.callback.call(map.editTools);
      },
      this
    );

    return container;
  }
});

L.NewLineControl = L.EditControl.extend({
  options: {
    position: "topleft",
    callback: map.editTools.startPolyline,
    kind: "line",
    html: "\\/\\"
  }
});

L.NewPolygonControl = L.EditControl.extend({
  options: {
    position: "topleft",
    callback: map.editTools.startPolygon,
    kind: "polygon",
    html: "▰"
  }
});

L.NewMarkerControl = L.EditControl.extend({
  options: {
    position: "topleft",
    callback: map.editTools.startMarker,
    kind: "marker",
    html: "🖈"
  }
});

L.NewRectangleControl = L.EditControl.extend({
  options: {
    position: "topleft",
    callback: map.editTools.startRectangle,
    kind: "rectangle",
    html: "⬛"
  }
});

L.NewCircleControl = L.EditControl.extend({
  options: {
    position: "topleft",
    callback: map.editTools.startCircle,
    kind: "circle",
    html: "⬤"
  }
});

map.addControl(new L.NewMarkerControl());
map.addControl(new L.NewLineControl());
map.addControl(new L.NewPolygonControl());
map.addControl(new L.NewRectangleControl());
map.addControl(new L.NewCircleControl());

var line = L.polyline([
  [43.1292, 1.256],
  [43.1295, 1.259],
  [43.1291, 1.261]
]).addTo(map);
line.enableEdit();
line.on("dblclick", L.DomEvent.stop).on("dblclick", line.toggleEdit);

var multi = L.polygon([
  [
    [
      [43.1239, 1.244],
      [43.123, 1.253],
      [43.1252, 1.255],
      [43.125, 1.251],
      [43.1239, 1.244]
    ],
    [[43.124, 1.246], [43.1236, 1.248], [43.12475, 1.25]],
    [[43.124, 1.251], [43.1236, 1.253], [43.12475, 1.254]]
  ],
  [[[43.1269, 1.246], [43.126, 1.252], [43.1282, 1.255], [43.128, 1.245]]]
]).addTo(map);
multi.enableEdit();
multi.on("dblclick", L.DomEvent.stop).on("dblclick", multi.toggleEdit);
multi.bindPopup("hi!");

var poly = L.polygon([
  [[43.1239, 1.259], [43.123, 1.263], [43.1252, 1.265], [43.125, 1.261]],
  [[43.124, 1.263], [43.1236, 1.261], [43.12475, 1.262]]
]).addTo(map);
poly.enableEdit();
poly.on("dblclick", L.DomEvent.stop).on("dblclick", poly.toggleEdit);

var rec = L.rectangle([[43.1235, 1.255], [43.1215, 1.259]]).addTo(map);
rec.enableEdit();
rec.on("dblclick", L.DomEvent.stop).on("dblclick", rec.toggleEdit);

var circle = L.circle([43.122, 1.25], { radius: 100 }).addTo(map);
circle.enableEdit();
circle.on("dblclick", L.DomEvent.stop).on("dblclick", circle.toggleEdit);
