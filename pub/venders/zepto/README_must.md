一定不要把 zepto 给包装成 cmd 格式了

因为如果 zepto 跟 seajs combo 之后同时加载，
运行时还没有执行 seajs.config（主要是 base 的设置），就会导致 zepto 的 id 不正确，
下次用的时候会再次加载一遍。