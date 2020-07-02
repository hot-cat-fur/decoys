package pesko.orgasms.app.domain.models.binding;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class EmailBindingModel {



    private String from;
    private String subject;
    @Length(min = 2)
    private String text;
}