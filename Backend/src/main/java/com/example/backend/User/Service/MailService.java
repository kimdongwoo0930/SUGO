package com.example.backend.User.Service;

import com.example.backend.User.Config.RedisUtil;
import com.example.backend.User.Entity.Dto.ResponseDto;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    RedisUtil redisUtil;



    // 키 생성
    private String ePw;


    public void setEPw(String key){
        ePw = key;
    }

    public ResponseDto equalEPw(String email,String key){
        if(redisUtil.existData(key)){
            return new ResponseDto(false,"인증시간이 만료되었습니다.");
        }
        if(redisUtil.getData(email).equals(key)){
            redisUtil.deleteData(email);
            return new ResponseDto(true,"인증 완료");
        }
        return new ResponseDto(false,"올바르지 않은 인증번호입니다.");
    }



    // 메일 내용 작성

    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
        setEPw(createKey());

        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);// 보내는 대상
        message.setSubject("수고했어 수원대 학생 인증 코드");// 제목

        String msgg = "";
        msgg += "<div style='margin:100px;'>";
        msgg += "<h1> 안녕하세요</h1>";
        msgg += "<h1> 수고했어 입니다. 받으신 인증코드를 입력해주세요.</h1>";
        msgg += "인증코드 : <strong>";
        msgg += ePw + "</strong><div><br/> ";
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("suwonSugo@naver.com", "수고했어"));// 보내는 사람

        return message;
    }

    // 랜덤 인증 코드 생성
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    // 메일 발송
    // sendSimpleMessage 의 매개변수로 들어온 to 는 곧 이메일 주소가 되고,
    // MimeMessage 객체 안에 내가 전송할 메일의 내용을 담는다.
    // 그리고 bean 으로 등록해둔 javaMail 객체를 사용해서 이메일 send!!

    public ResponseDto sendSimpleMessage(String to) throws Exception {
        // 랜덤 인증번호 생성
        MimeMessage message = createMessage(to); // 메일 발송
        try {// 예외처리
            if(redisUtil.existData(to)){
                redisUtil.deleteData(to);
            }
            javaMailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

        redisUtil.setDataExpire(to,ePw,60*3L);

        return new ResponseDto(true,"이메일 전송됨");
    }
}
