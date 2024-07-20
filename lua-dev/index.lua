local key = KEYS[1]
local inerval = tonumber(ARGV[1])
local count = tonumber(ARGV[2])

-- return {key, inerval, count}

local limit = tonumber(redis.call("get", key) or '0')

if limit + 1 >= count then
    return 0
else
    redis.call("incr", key)
    redis.call("expire", key, inerval)
    return 1
end
