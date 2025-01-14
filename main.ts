import { serveFile } from "jsr:@std/http/file-server";
import { parseArgs } from "jsr:@std/cli/parse-args";



const args = parseArgs(Deno.args)

Deno.env.set("APP_SOURCEDIR", args.sourceDir || Deno.cwd());

Deno.serve({ port: args.port || 8000 },async (req: Request) => {
    
    const decoder = new TextDecoder("utf-8"); 

    const {pathname} = new URL(req.url)

    if(pathname.startsWith("/public")){
        console.log("serving",`.${pathname}`)
        return serveFile(req, `.${pathname}`) 
    }

    // console.log(Deno.env.get("APP_SOURCEDIR"))

    const main_html = await Deno.readFile(`${Deno.env.get("APP_SOURCEDIR") || Deno.cwd()}/pages/index.html`)
    return new Response(decoder.decode(main_html), {
          headers: {
            "content-type": "text/html",
    }});

  

}
);
