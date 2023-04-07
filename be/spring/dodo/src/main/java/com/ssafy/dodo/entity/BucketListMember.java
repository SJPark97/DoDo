package com.ssafy.dodo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "bucketlist_members")
@IdClass(BucketListMemberSeq.class)
@Getter
@NoArgsConstructor
@Where(clause = "is_delete = false")
@SQLDelete(sql = "UPDATE bucketlist_members SET is_delete = true WHERE seq = ?")
public class BucketListMember extends BaseEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketlist_seq")
    private BucketList bucketList;

    private boolean isDelete;

    @Builder
    public BucketListMember(User user, BucketList bucketList, boolean isDelete) {
        this.user = user;
        this.bucketList = bucketList;
        this.isDelete = isDelete;
    }
}
