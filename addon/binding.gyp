{
  "targets":[
    {
      "target_name" : "screen",
      "sources":["index.cpp"],
      "include_dirs":["<!@(node -p \"require('node-addon-api').include\")"],
    }
  ]
}