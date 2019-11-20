package hello;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

    @RequestMapping("/test")
    public String index() {
        return "Apparently Travis -> Heroku is working jsut fine :)";
    }

}
