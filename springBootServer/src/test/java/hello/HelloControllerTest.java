package hello;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class HelloControllerTest {

   @Test
    void myFirstTest() {
        assertEquals(42, Integer.sum(19, 23));
    }
}
