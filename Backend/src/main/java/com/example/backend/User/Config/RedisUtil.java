package com.example.backend.User.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisUtil {

    private final StringRedisTemplate redisTemplate;

    public RedisUtil(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    //key를 통해 value 리턴하기
    public String getData(String key){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setData(String key, String value){
        ValueOperations<String,String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    // 유효 시간 동안 저장
    public void setDataExpire(String key,String value, long duration){
        ValueOperations<String,String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        System.out.println(expireDuration);
        valueOperations.set(key,value,expireDuration);
    }

    // 데이터 존재 여부
    public boolean existData(String key){
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    // 삭제
    public void deleteData(String key){
        redisTemplate.delete(key);
    }
}

