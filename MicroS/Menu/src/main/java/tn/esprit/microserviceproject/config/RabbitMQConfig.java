package tn.esprit.microserviceproject.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String MENU_EXCHANGE = "menu.exchange";
    public static final String MENU_QUEUE = "menu.queue";
    public static final String MENU_ROUTING_KEY = "menu.routingkey";
    public static final String ADD_TO_CART_QUEUE = "add.to.cart.queue";
    public static final String ADD_TO_CART_ROUTING_KEY = "add.to.cart.routingkey";

    @Bean
    public Queue menuQueue() {
        return new Queue(MENU_QUEUE, true);
    }

    @Bean
    public Queue addToCartQueue() {
        return new Queue(ADD_TO_CART_QUEUE, true);
    }

    @Bean
    public TopicExchange menuExchange() {
        return new TopicExchange(MENU_EXCHANGE);
    }

    @Bean
    public Binding menuBinding(Queue menuQueue, TopicExchange menuExchange) {
        return BindingBuilder.bind(menuQueue).to(menuExchange).with(MENU_ROUTING_KEY);
    }

    @Bean
    public Binding addToCartBinding(Queue addToCartQueue, TopicExchange menuExchange) {
        return BindingBuilder.bind(addToCartQueue).to(menuExchange).with(ADD_TO_CART_ROUTING_KEY);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}