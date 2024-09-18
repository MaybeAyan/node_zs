#define NAPI_VERSION 3
#define NAPI_CPP_EXCEPTIONS

#include <Windows.h>
#include <napi.h>

Napi::Value getScreenSize(const Napi::CallbackInfo &info)
{

  Napi::Env env = info.Env();
  Napi::Object obj = Napi::Object::New(env);

  int cx = GetSystemMetrics(SM_CXSCREEN);
  int cy = GetSystemMetrics(SM_CYSCREEN);

  obj.Set("width", cx);
  obj.Set("height", cy);

  return obj;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set("getScreenSize", Napi::Function::New(env, getScreenSize));

  return exports;
}

NODE_API_MODULE(NODE_GYP_MODEULE_NAME, Init);